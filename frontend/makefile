dev:
	@if [ "$$(basename "$$(pwd)")" = "frontend" ]; then \
			npm run dev; \
	else \
			echo "No estás en el directorio ./frontend"; \
	fi
lint:
	@if [ "$$(basename "$$(pwd)")" = "frontend" ]; then \
			npm run format; \
			npm run type-check; \
			npm run lint; \
	else \
			echo "No estás en el directorio ./frontend"; \
	fi 
	
build:
	@if [ "$$(basename "$$(pwd)")" = "frontend" ]; then \
			npm run format; \
			npm run type-check; \
			npm run lint; \
			npm run build; \
			@rm -rf public/!(assets|favicon.ico|404.svg) 
	else \
			echo "No estás en el directorio ./frontend"; \
	fi