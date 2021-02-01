#!/usr/bin/env python
from pathlib import Path

from simple_pipes import pipe_call

deployments = [
    [("production"), 1],
]

for env, count in deployments:
    ssh_dir = f"/Users/joel/.ssh/contacts/{env}"
    Path(ssh_dir).mkdir(parents=True, exist_ok=True)

    for i in range(count):
        pipe_call(("ssh-keygen", "-N", "", "-f", f"{ssh_dir}/DO{i}"))
