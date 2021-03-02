from setuptools import setup

if __name__ == "__main__":
    setup(
        install_requires=[
            "django-debug-toolbar",
            "django-extensions",
            "django-silk",
            "django",
            "djangorestframework==3.11",
            "drf-yasg",
            "randutils",
            "gunicorn",
            "psycopg2",
            "Pillow",
            "safe_environ",
            "jsonfield",
            "names",
        ],
        extras_require={
            "tests": [
                "pytest-bdd",
                "pytest-cov",
                "pytest-html",
                "pytest-sugar",
                "pytest-watch",
                "pytest",
                "tox",
            ],
            "tools": [
                "autoflake",
                "bandit",
                "black",
                "bump2version",
                "isort",
                "mypy",
                "pylint",
                "quickdocs",
                "twine",
                "wheel",
            ],
        },
    )
