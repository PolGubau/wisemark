# VSCode Extension

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

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

   ![Scan Command](https://github.com/PolGubau/wisemark/blob/main/packages/vscode/public/example.png?raw=true)

3. **Group Comments**:  
   Toggle grouping for better visibility and organization of your comments using the **Toggle Grouping** command.

   ![Grouping Command](https://github.com/PolGubau/wisemark/blob/main/packages/vscode/public/fileGroup.png?raw=true)

4. **Navigate Between Comments**:  
   Use the **Select and Open a Comment** command to quickly navigate between comments in your code.

   ![Navigate Comments](https://github.com/PolGubau/wisemark/blob/main/packages/vscode/public/list.png?raw=true)

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

![Predictive Feature](https://github.com/PolGubau/wisemark/blob/main/packages/vscode/public/predict.png?raw=true)

## Quick Pick for Commands

For even faster insertion of comments, use the **Quick Pick** functionality, which suggests the best options for your current task.

![Quick Pick](https://github.com/PolGubau/wisemark/blob/main/packages/vscode/public/quickpick.png?raw=true)

## Group Comments by Type

Easily group your comments by type for better organization.

![Group Comments](https://github.com/PolGubau/wisemark/blob/main/packages/vscode/public/typeGroup.png?raw=true)

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
