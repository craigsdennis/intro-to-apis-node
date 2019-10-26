if [ ! -f .env ]; then
    cp .env.example .env
    refresh
fi