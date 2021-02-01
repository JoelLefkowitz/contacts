terraform {
  backend "s3" {
    bucket = "rhea-terraform-backend"
    key    = "AKIAJUIXDXBKSWSVTZKA" # nosec - Public key component
    region = "eu-west-2"
  }

  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 1.22"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "digitalocean" {
  token = var.DO_ACCESS_TOKEN
}

provider "aws" {
  region = var.aws_region
  access_key = "AKIAJUIXDXBKSWSVTZKA"
  secret_key = var.AWS_SECRET_KEY
}
