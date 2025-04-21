# Wisemark monorepo

Your TODOs, with deadline. And consequences.

Wisemark is a simple and powerful standard to manage your code comments. It allows to:

1. Track your TODOs, FIXMEs, and other comments in your code.
2. Set deadlines for your TODOs and FIXMEs.
3. Fail pipelines if you have overdue comments.
4. Generate reports of your comments.

Haven't you ever found forgot comments in legacy code? Or have you ever had to deal with a TODO that was never done? Wisemark is here to help you.

Main usage:

```ts
// @question What if the numbers are negative?
function sum(a: number, b: number): number {
  // @todo Add a test for negative numbers
  return a + b;
}
```

Using the main types:
| Type | Description |
|------|-------------|
| @todo | A task that needs to be done. |
| @fixme | A critical issue that needs fixing. |
| @note | A note or comment. |
| @question | A question that needs answering. |
| @refactor | A suggestion to improve the code. |

Wisemark will automatically detect these comments and allow you to manage them.
![Scan Command](https://github.com/PolGubau/wisemark/blob/readme-update/packages/vscode/public/example.png?raw=true)
This is the usual output using the VSCode extension.

## Packages

- [@wisemark/core](packages/core): The core library for Wisemark. It provides the main functionality and API for managing comments.
- [@wisemark/cli](packages/cli): The command-line interface for Wisemark. It allows you to run Wisemark commands from the terminal.
- [@wisemark/vscode](packages/vscode): The VSCode extension for Wisemark. It provides a user interface for managing comments directly in the editor.

# Creating Wisemark Comments

A comment can be as simple as:

```ts
// @<type> <message>
```

Examples:

```ts name="Example.ts"
// @todo Add a test for negative numbers
// @fixme Fix the bug in the code
// @note This is a note
// @question What if the numbers are negative?
// @refactor Refactor this function
```

Some optional parameters can be added to the comment:

- severity: low, medium, high
- tags: any string separated by commas
- author: the author of the comment
- due: the due date of the comment (YYYY-MM-DD)
- id: A unique name for the comment (its generated automatically but you can override it)

Structure of the comment:

````ts
// @<type> <message> -- severity: <severity> -- tags: <tags> -- author: <author> -- due: <due> -- id: <id>
```

```ts title="Example.ts"
// @todo Add a test for negative numbers -- severity: high -- tags: bug, urgent -- author: Pol Gubau -- due: 2023-10-01 -- id: test-negative-numbers

// @fixme Fix the bug in the code -- severity: medium -- tags: bug,correct
````

# CLI Tool

Wisemark CLI is a command-line tool that allows you to manage your comments directly from the terminal. It provides commands for scanning your codebase, generating reports, and managing your TODOs and FIXMEs. (Report generation is not yet implemented)

### Remote or Local Installation

#### Remote Run

If you don't want to install Wisemark in you computer just run the following command in your terminal:

```bash
npx @wisemark/cli
```

#### Local Installation

You can install Wisemark CLI globally using npm:

```bash
npm install -g @wisemark/cli
```

### Usage

Once installed, you can use the following commands:

#### Scan Wisemark Commands

This command scans your codebase for Wisemark comments and generates a report of all the TODOs, FIXMEs, and other comments.
Can be triggered with the default command `wisemark` or `wisemark scan`.

```bash
wisemark [options]
```

```bash
wisemark lint [options]
```

#### Options

For these both commands you can use the following options:

    The optional options are:

- `--type`: Filter by type (todo, note, fixme)
- `--path`: Inner path of the project to scan (default: `.`)
- `--severity`: Filter by severity (low, medium, high)
- `--json`: Return output in JSON format
- `--table`: Return output in table format
- `--showDate`: Show the date of the comment
- `--withDueDate`: Return only comments with a due date
- `--due`: Filter by due date (YYYY-MM-DD)
- `--tags`: Filter by tags (comma separated)
- `--cwd`: Path to the project (default: current working directory)
- `--help`: Show help information
- `--version`: Show version information

A full example of the command would be:

```bash
wisemark --type todo --path src --severity high --json --showDate --withDueDate --due 2023-10-01 --tags bug,urgent
```

# VSCode Extension

Wisemark is a VSCode extension that helps you manage and scan intelligent commands within your codebase. It enables easy insertion of different types of comments (like TODO, FIXME, Notes, Questions, Refactors) and allows you to quickly navigate and manage these comments. It also provides enhanced token coloring and grouping options for better code organization.

## Features

- **Command Insertion**: Insert predefined comments such as:
  - Note
  - Todo
  - Fixme
  - Question
  - Refactor
- **Command Scanning**: Scan and manage your project for specific commands with a quick search functionality.
- **Grouping**: Toggle grouping of comments for better organization.
- **Color Customization**: Different colors for each comment type (Note, Todo, etc.) to make your comments more visually distinguishable.
- **Contextual Menus**: Access all commands directly from the editor's context menu.
- **Quick Navigation**: Easily navigate between comments and sections in your code.

## Installation

1. Open VSCode.
2. Go to the Extensions view (`Ctrl+Shift+X`).
3. Search for `Wisemark`.
4. Click **Install**.

Alternatively, you can install it via the terminal:

```bash
ext install wisemark
```

## Usage

Once installed, you'll be able to use Wisemark to:

1. **Insert Comments**:  
   You can insert the following comments in your code:

   - **Note**: `ctrl+alt+n`
   - **Todo**: `ctrl+alt+t`
   - **FIXME**: `ctrl+alt+f`
   - **Question**: `ctrl+alt+q`
   - **Refactor**: `ctrl+alt+r`

2. **Command Scanning**:  
   To scan for all comments, run the **Scan Wisemark Commands** command from the command palette (`Ctrl+Shift+P` > **Scan Wisemark commands**).

   ![Scan Command](https://github.com/PolGubau/wisemark/blob/readme-update/packages/vscode/public/example.png?raw=true)

3. **Group Comments**:  
   Toggle grouping for better visibility and organization of your comments using the **Toggle Grouping** command.

   ![Grouping Command](https://github.com/PolGubau/wisemark/blob/readme-update/packages/vscode/public/fileGroup.png?raw=true)

4. **Navigate Between Comments**:  
   Use the **Select and Open a Comment** command to quickly navigate between comments in your code.

   ![Navigate Comments](https://github.com/PolGubau/wisemark/blob/readme-update/packages/vscode/public/list.png?raw=true)

## Configuration

You can customize the token colors for each comment type. By default, Wisemark uses the following colors:

- **Note**: `#ff6347` (italic)
- **Todo**: `#e5c07b` (bold)
- **FIXME**: `#f0f0f0` (italic)
- **Refactor**: `#00bcd4` (bold)
- **Question**: `#8be9fd` (italic)

To customize, open the VSCode settings and modify the `"editor.tokenColorCustomizations"` to your liking.

## Predictive Features

Wisemark also predicts the most used comments based on your previous usage, helping you streamline the process.

![Predictive Feature](https://github.com/PolGubau/wisemark/blob/readme-update/packages/vscode/public/predict.png?raw=true)

## Quick Pick for Commands

For even faster insertion of comments, use the **Quick Pick** functionality, which suggests the best options for your current task.

![Quick Pick](https://github.com/PolGubau/wisemark/blob/readme-update/packages/vscode/public/quickpick.png?raw=true)

## Group Comments by Type

Easily group your comments by type for better organization.

![Group Comments](https://github.com/PolGubau/wisemark/blob/readme-update/packages/vscode/public/typeGroup.png?raw=true)

# Roadmap

| Feature             | Status | Description                                                                  |
| ------------------- | ------ | ---------------------------------------------------------------------------- |
| Core Functionality  | ✅     | Basic functionality for managing comments.                                   |
| CLI Tool            | ✅     | Command-line interface for running Wisemark commands (Scan + due date lint). |
| VSCode Extension    | ✅     | VSCode extension for managing comments directly in the editor.               |
| Grouping            | ✅     | Group comments by type for better organization.                              |
| Color Customization | ✅     | Customize colors for different comment types.                                |
| Predictive Features | ✅     | Predict the most used comments based on previous usage.                      |
| Quick Pick          | ✅     | Suggest the best options for your current task.                              |
| Report Generation   | 🟧     | Generate reports of your comments.                                           |
| Overdue Linting     | 🟧     | Fail pipelines if you have overdue comments.                                 |
| Customizable Rules  | 🟧     | Allow users to define their own rules for comments. (wisemark.config.ts)     |

## Contributing

If you'd like to contribute to Wisemark, feel free to submit issues and pull requests. Contributions are welcome!

1. Fork this repository.
2. Create your branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy organizing your code and comments with Wisemark!
