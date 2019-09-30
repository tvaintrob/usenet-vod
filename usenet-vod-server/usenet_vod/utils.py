from typing import Dict, List, Callable


def select(d: Dict, *args) -> Dict:
    return {k: v for k, v in d.items() if k in args}


