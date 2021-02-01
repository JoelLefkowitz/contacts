resource "digitalocean_project" "contacts_project" {
  name        = "Contacts"
  description = "Contacts resources"
  purpose     = "Web Application"
  environment = "production"
  resources   = [
      for droplet in digitalocean_droplet.contacts_droplets: 
      droplet.urn
    ]
  depends_on = [digitalocean_droplet.contacts_droplets]
}

resource "digitalocean_domain" "contacts_domain" {
  count      = var.droplet_count > 0 ? 1 : 0
  name       = "contacts.smoothycode.com"
  ip_address = digitalocean_floating_ip.contacts_floating_ip[0].ip_address
  depends_on = [digitalocean_droplet.contacts_droplets]
}

resource "digitalocean_floating_ip" "contacts_floating_ip" {
  count      = var.droplet_count > 0 ? 1 : 0
  droplet_id = digitalocean_droplet.contacts_droplets[0].id
  region     = digitalocean_droplet.contacts_droplets[0].region
  depends_on = [digitalocean_droplet.contacts_droplets]
}
resource "digitalocean_ssh_key" "contacts_keys" {
  count      = var.droplet_count
  name       = format("contacts%s", count.index)
  public_key = file(format("~/.ssh/contacts/production/DO%s.pub", count.index))
}

resource "digitalocean_droplet" "contacts_droplets" {
  count              = var.droplet_count
  image              = "ubuntu-18-04-x64"
  name               = format("Contacts%s", count.index)
  region             = var.do_region
  size               = "s-1vcpu-1gb"
  private_networking = "true"
  ssh_keys           = [digitalocean_ssh_key.contacts_keys[count.index].fingerprint]
  depends_on         = [digitalocean_ssh_key.contacts_keys]
}
