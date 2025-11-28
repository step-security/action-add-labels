# Action Add Labels

![screenshot](./docs/assets/screenshot.png)

This is a GitHub Action to add GitHub labels to an issue or a pull request.

This action extract the number from an issue or a pull request which has triggered this by default.
It means you don't need to care about something annoying like whether you should use `${{ github.event.issue.number }}` or `${{ github.event.pull_request.number }}`.

It would be more useful to use this with other GitHub Actions' outputs.

## Inputs

|      NAME      |                                           DESCRIPTION                                           |   TYPE   | REQUIRED |                                     DEFAULT                                     |
| -------------- | ----------------------------------------------------------------------------------------------- | -------- | -------- | ------------------------------------------------------------------------------- |
| `github_token` | A GitHub token.                                                                                 | `string` | `false`   | `${{ github.token }}`                                                                           |
| `labels`       | The labels' name to be added. Must be separated with line breaks if there're multiple labels. | `string` | `true`   | `N/A`                                                                           |
| `number`       | The number of the issue or pull request.                                                        | `number` | `false`  | `N/A`                                                                           |
| `repo`         | The owner and repository name. e.g.) `Codertocat/Hello-World`                                   | `string` | `false`  | `${{ github.event.issue.number }}` or `${{ github.event.pull_request.number }}` |

## Example

### Add a single label with a comment

```yaml
name: Add Label

on:
  issues:
    types: opened

jobs:
  add_label:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v6

      - name: add label
        uses: step-security/action-add-labels@v1
        if: ${{ startsWith(github.event.comment.body, '/add-labels') }}
        with:
          labels: bug
```

### Add multiple labels with a comment

```yaml
name: Add Labels

on:
  pull_request:
    types: opened

jobs:
  add_labels:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v6

      - name: add labels
        uses: step-security/action-add-labels@v1
        if: ${{ startsWith(github.event.comment.body, '/add-labels') }}
        with:
          labels: |
            documentation
            changelog
```

## License

Copyright 2020 The Actions Ecosystem Authors.
Copyright 2025 StepSecurity.

Action Add Labels is released under the [Apache License 2.0](./LICENSE).
