release: cd backend && python manage.py migrate
web: gunicorn backend.wsgi:application --chdir backend
