FROM python:3.8.6

# Setup environment
WORKDIR /registry

# Build and cache dependencies
COPY setup.py setup.py
RUN pip install --upgrade pip
RUN pip install --no-cache-dir .

# Copy source
COPY . .
EXPOSE 8000/tcp
ENTRYPOINT entrypoint.sh
