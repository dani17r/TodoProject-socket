.PHONY: build build-back build-front clean-public-back copy-dist dev-back split-window dev-front dev

dev-back:
	@xdotool type 'cd ./backend && npm run dev'
	@xdotool key Return

dev-front:
	@xdotool type 'cd ./frontend && npm run dev'
	@xdotool key Return

build-back:
	@cd backend && npm run build

clean-public-back:
	@find backend/public/ -mindepth 1 -maxdepth 1 ! -name 'upload' -exec rm -rf {} +

build-front:
	@cd frontend && npm run build

copy-dist:
	@cp -r frontend/dist/* backend/public/
	@rm -rf frontend/dist

split-window:
	@xdotool key 'ctrl+shift+0'
	@xdotool key Return

dev: dev-back split-window dev-front
build: build-back clean-public-back build-front copy-dist