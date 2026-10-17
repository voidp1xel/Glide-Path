#!/usr/bin/env python3
"""Bundle the website as-is for Android's offline WebView shell."""
import shutil
from pathlib import Path

root = Path(__file__).resolve().parents[2]
source = root / "site"
target = root / "android/app/src/main/assets/www"
if target.exists():
    shutil.rmtree(target)
shutil.copytree(source, target, ignore=shutil.ignore_patterns(".DS_Store"))
print(f"Copied {sum(1 for p in target.rglob('*') if p.is_file())} website assets into {target}")
