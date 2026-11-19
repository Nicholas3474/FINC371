#!/bin/sh
# Assemble the single-page guide from its parts
cd "$(dirname "$0")" && { cat shell.html; echo '<script>'; sed '/^if(typeof module/d' logic.js; cat terms.js theory.js lessons.js e3content.js lecture.js examlike.js examlike2.js facts.js games.js ui.js; echo '</script>'; } > index.html
