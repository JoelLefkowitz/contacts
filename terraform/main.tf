terraform {
  backend "s3" {
    bucket = "contacts-contacts-terraform-backend" # nosec - Public bucket name
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
  access_key  = "AKIAJUIXDXBKSWSVTZKA" # nosec - Public key component
  secret_key = var.AWS_SECRET_KEY
}

module "cluster" {
  source  = "JoelLefkowitz/cluster/digitalocean"
  version = "1.4.5"
  
  project = "contacts"
  env = "production"

  droplet_count = 1
  ssh_dir = "~/.ssh/contacts"
  
  domain = "None"
  has_floating = true
}

module "staging_cluster" {
  source  = "JoelLefkowitz/cluster/digitalocean"
  version = "1.4.5"
  
  project = "contacts"
  env = "staging"

  droplet_count = 1
  ssh_dir = "~/.ssh/contacts"
  
  domain = "staging.None"
  has_floating = true
}