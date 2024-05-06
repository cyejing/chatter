use std::char;

use log::info;
use regex::Regex;
use serde::{Deserialize, Serialize};

#[derive(Debug, Default, Deserialize)]
pub struct RecognizeReq {
    text: String,
    mode: Option<String>,
}

#[derive(Debug, Default, Serialize)]
pub struct RecognizeResp {
    pub origin: String,
    pub lines: Vec<String>,
    pub line_words: Vec<Vec<String>>,
}

pub fn recognize(req: RecognizeReq) -> RecognizeResp {
    let line_strs: Vec<&str> = req
        .text
        .split(|c: char| c.is_ascii_control() || c == '.')
        .collect();
    let mut lines = vec![];
    let mut line_words = vec![];
    for line in line_strs {
        let line = line.trim();

        let line = if let Some("no_pun") = req.mode.as_deref() {
            line.replace(|c: char| c.is_ascii_punctuation(), " ")
        } else {
            line.to_string()
        };
        let regex = Regex::new(r"\s+").unwrap();
        let line = regex.replace_all(&line, " ");

        let line = line.trim();
        if line.is_empty() {
            continue;
        }

        let line_word: Vec<String> = line
            .split_ascii_whitespace()
            .map(|s| s.to_string())
            .collect();

        lines.push(format!("{line} "));
        line_words.push(line_word);
    }

    info!("recognize: lines:{}", lines.len());
    RecognizeResp {
        origin: req.text,
        lines,
        line_words,
    }
}

#[cfg(test)]
mod tests {
    use crate::text_recognize::RecognizeReq;

    use super::recognize;

    #[test]
    fn test_recognize1() {
        let text = r#"hello welcome
        ni hao "#;
        let recognize = recognize(RecognizeReq {
            text: text.to_string(),
            mode: None,
        });
        println!("{recognize:?}");
        assert_eq!(recognize.lines.len(), 2);
        assert_eq!(recognize.lines.get(0), Some(&"hello welcome".to_string()));
        assert_eq!(
            recognize.line_words.get(1).and_then(|w| w.get(0)),
            Some(&"ni".to_string())
        )
    }

    #[test]
    fn test_recognize2() {
        let text = r#"#[derive(Debug, Serialize)]
                    pub struct TextRecognize {
                        pub origin: String,
                        pub lines: Vec<String>,
                        pub line_words: Vec<Vec<String>>,
                    }"#;
        let recognize = recognize(RecognizeReq {
            text: text.to_string(),
            mode: Some("no_pun".to_string()),
        });
        println!("lines: {:?}", recognize.lines);
        println!("line_words: {:?}", recognize.line_words);
        assert_eq!(recognize.lines.len(), 5);
        assert_eq!(
            recognize.lines.get(4),
            Some(&"pub line words Vec Vec String".to_string())
        );
    }

    #[test]
    fn test_recognize3() {
        let text = r#"Night gathers, and now my watch begins. It shall not end until my death. I shall , take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live ,and die at my post."#;

        let recognize = recognize(RecognizeReq {
            text: text.to_string(),
            mode: Some("no_pun".to_string()),
        });
        println!("lines: {:?}", recognize.lines);
        println!("line_words: {:?}", recognize.line_words);
        assert_eq!(recognize.lines.len(), 5);
        assert_eq!(
            recognize.lines.get(4),
            Some(&"I shall live and die at my post".to_string())
        );
        assert_eq!(
            recognize.line_words.get(2).and_then(|w| w.get(2)),
            Some(&"take".to_string())
        );
    }
}
