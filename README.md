# Django app for YouTube video search

A single page application for searching YouTube video based on search term. It uses Google YouTube v3 API for fetching YouTube video results.

## Prerequisites
- Python ver 3.9
- Pipenv or Virtual env
- Git

## Development Env Setup
1. Clone git repository and change to directory
```git
git clone https://github.com/arkisoul/youtube-search.git
```
```shell
cd youtube-search
```
2. Activate virtual env using pipenv
```pipenv
pipenv shell
```
3. Install dependencies using pipenv
```pipenv
pipenv install
```
4. Copy .env.example file to .env. Use a random secret key for Django and use provided Google Secret API key
5. Run the development server
```python
python manage.py runserver
```

### Query
For any query please contact at [mailto](mailto:arpit.jain@live.com)