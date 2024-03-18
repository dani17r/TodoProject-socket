
dev:
	@if [ "$$(basename "$$(pwd)")" = "backend" ]; then \
			npm run dev; \
	else \
			echo "No estás en el directorio ./backend"; \
	fi

build:
	@if [ "$$(basename "$$(pwd)")" = "backend" ]; then \
			npm run build; \
			@rm -rf public/!(assets|favicon.ico|404.svg) 
	else \
			echo "No estás en el directorio ./backend"; \
	fi