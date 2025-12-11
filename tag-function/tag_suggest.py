# tag_suggest.py
from collections import Counter
import re
from typing import List, Tuple

STOPWORDS = {
    "a","about","above","after","again","against","all","am","an","and","any","are","aren't","as","at","be","because","been",
    "before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does",
    "doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have",
    "haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how",
    "how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more",
    "most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours",
    "ourselves","out","over","own","same","she","she'd","she'll","she's","should","shouldn't","so","some","such","than",
    "that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll",
    "they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd",
    "we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who",
    "who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your",
    "yours","yourself","yourselves"
}

def _clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[\r\n]+', ' ', text)
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def _tokenize(text: str):
    return text.split()

def _generate_ngrams(tokens, n: int):
    phrases = []
    L = len(tokens)
    for i in range(L):
        if i + n <= L:
            t = tokens[i:i+n]
            if t[0] in STOPWORDS or t[-1] in STOPWORDS:
                continue
            phrase = " ".join(t)
            phrases.append((phrase, i, i+n-1))
    return phrases

def _score_phrases(phrases, tokens_len: int):
    counts = Counter()
    first_pos = {}
    for phrase, start, end in phrases:
        counts[phrase] += 1
        if phrase not in first_pos:
            first_pos[phrase] = start

    scores = Counter()
    for phrase, freq in counts.items():
        pos = first_pos[phrase]
        pos_score = 1.0 - (pos / max(1, tokens_len - 1))
        length_bonus = 1.0 + (min(3, len(phrase.split())) - 1) * 0.15
        scores[phrase] = freq * (1.0 + pos_score) * length_bonus
    return scores

def suggest_tags(text: str, top_n: int = 5):
    cleaned = _clean_text(text)
    tokens = _tokenize(cleaned)
    if not tokens:
        return []

    all_phrases = []
    for n in range(1, 4):
        all_phrases.extend(_generate_ngrams(tokens, n))

    if not all_phrases:
        return []

    scores = _score_phrases(all_phrases, len(tokens))
    candidates = [p for p, s in scores.most_common(top_n * 3)]

    final = []
    seen = set()
    for phrase in candidates:
        if len(final) >= top_n:
            break
        if len(phrase) < 2:
            continue
        if re.fullmatch(r'\d+', phrase):
            continue
        slug = re.sub(r'\s+', '-', phrase.strip())
        if slug in seen:
            continue
        seen.add(slug)
        final.append(slug)
    return final
