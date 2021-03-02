#!/usr/bin/env python
import os
from digitalocean_inventory import fetch

if __name__ == '__main__':
    inventory = fetch(stdout=False)
    print(inventory)
