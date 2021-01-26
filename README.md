# Contacts

Angular/Electron application that models an address book.

## Status

| Source     | Shields                                                        |
| ---------- | -------------------------------------------------------------- |
| Project    | ![license][license] ![release][release]                        |
| Raised     | [![issues][issues]][issues_link] [![pulls][pulls]][pulls_link] |

## Preview

![Architecture][architecture]

## Running the app

### Development

Create a virtual environemnt

```bash
python -m venv venv
source venv/bin/activate
```

Install the server's dependencies

```bash
cd registry
pip install .
```

Run an instance of the server

```bash
sh tools/scripts/runserver.sh
```

To serve the frontend in the browser (port 4200)

```bash
cd contacts
npm i
```

```bash
npm run dev
```

To run with electron

```bash
npm run electron
```

### Production

```bash
cd registry
docker build -t joellefkowitz/registry:0.1.0
```

```bash
cd contacts
docker build . -t joellefkowitz/contacts:0.1.0
```

```bash
docker stack deploy prod -c compose/docker-compose.yml
```

### Versioning

[SemVer](http://semver.org/) is used for versioning. For a list of versions available, see the tags on this repository.

Bump2version is used to version and tag changes.
For example:

```bash
bump2version patch
```

Releases are made on every major change.

### Author

- **Joel Lefkowitz** - _Initial work_ - [Joel Lefkowitz](https://github.com/JoelLefkowitz)

See also the list of contributors who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### Acknowledgments

None yet!

[license]: https://img.shields.io/github/license/joellefkowitz/contacts
[release]: https://img.shields.io/github/v/tag/joellefkowitz/contacts
[issues]: https://img.shields.io/github/issues/joellefkowitz/contacts "Issues"
[issues_link]: https://github.com/JoelLefkowitz/contacts/issues
[pulls]: https://img.shields.io/github/issues-pr/joellefkowitz/contacts "Pull requests"
[pulls_link]: https://github.com/JoelLefkowitz/contacts/pulls
[architecture]: https://github.com/JoelLefkowitz/contacts/raw/master/architecture.png "Architecture"
