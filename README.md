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
![Scan Command](public/example.png)

# Wisemark - Intelligent Command Scanner for Your Projects

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

   ![Scan Command](public/example.png)

3. **Group Comments**:  
   Toggle grouping for better visibility and organization of your comments using the **Toggle Grouping** command.

   ![Grouping Command](public/fileGroup.png)

4. **Navigate Between Comments**:  
   Use the **Select and Open a Comment** command to quickly navigate between comments in your code.

   ![Navigate Comments](public/list.png)

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

![Predictive Feature](public/predict.png)

## Quick Pick for Commands

For even faster insertion of comments, use the **Quick Pick** functionality, which suggests the best options for your current task.

![Quick Pick](public/quickpick.png)

## Group Comments by Type

Easily group your comments by type for better organization.

![Group Comments](public/typeGroup.png)

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
