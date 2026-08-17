FROM libretranslate/libretranslate:latest

EXPOSE 5000

CMD ["--host", "0.0.0.0", "--port", "5000", "--load-only", "en", "ar"]