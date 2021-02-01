// SECRETS DECLARATIONS
variable "AWS_SECRET_KEY" {}

variable "DO_ACCESS_TOKEN" {}

// NON-SECRET DECLARATIONS
variable "AWS_ACCESS_KEY" {
  default = "AKIAJUIXDXBKSWSVTZKA"
}

// LOCATION VARIABLES
variable "aws_region" {
  default = "eu-west-2"
}

variable "do_region" {
  default = "lon1"
}

// CONFIGURABLES
variable "droplet_count" {
  default = 1
}
