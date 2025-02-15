# Google

variable "project" {
  type = string
}

variable "region" {
  type = string
}

variable "app_engine_region" {
  type = string
}

# GitHub

variable "github_client_id" {
  type = string
}

variable "github_scope" {
  type = string
}

variable "github_redirect_uri" {
  type = string
}

variable "github_app_auth_scope" {
  type = string
}

variable "github_app_auth_redirect_uri" {
  type = string
}
# Amplitude

variable "amplitude_api_key" {
  type = string
}

# Cloud SQL
variable "database_tier" {
  type = string
}

# Cloud Run

variable "image_id" {
  type = string
}

variable "generated_app_base_image_id" {
  type = string
}

variable "bcrypt_salt_or_rounds" {
  type = string
}

variable "feature_flags" {
  type = map(any)
}

variable "host" {
  type = string
}

variable "server_database_connection_limit" {
  type = number
}

variable "server_min_scale" {
  type = number
}

variable "server_max_scale" {
  type = number
}

# Secret Manager

variable "github_client_secret_id" {
  type = string
}

# Storage

variable "bucket" {
  type = string
}

variable "bucket_location" {
  type = string
}

variable "default_disk" {
  type = string
}

# Container Builder

variable "apps_project" {
  type = string
}

variable "container_builder_default" {
  type = string
}

# Deployer

variable "deployer_default" {
  type = string
}

variable "apps_region" {
  type = string
}

variable "apps_terraform_state_bucket" {
  type = string
}

variable "apps_database_instance" {
  type = string
}

variable "apps_domain" {
  type = string
}

variable "apps_dns_zone" {
  type = string
}
