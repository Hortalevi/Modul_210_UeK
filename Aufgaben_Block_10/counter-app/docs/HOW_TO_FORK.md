# How to Copy the Candidate Repository

> This manual describes how a candidate of module 109 can copy this repository into their personal work environment.

---

### Table of Contents

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Important Git Terminology](#important-git-terminology)
- [Important Git Commands](#important-git-commands)
- [How to Copy (Fork) the Candidate Repository](#how-to-copy-fork-the-candidate-repository)

## Goal

The goal of this manual is to guide candidates through the process of copying (forking) the repository into their personal GitHub profile.

[Back To The Top](#how-to-copy-the-candidate-repository)

## Prerequisites

To execute the following steps, ensure you meet the following requirements:

- Have a personal GitHub account.
- Have the [git](https://git-scm.com/) application installed locally.
- Have a sophisticated text editor (e.g., [VS Code](https://code.visualstudio.com/)) installed locally.

[Back To The Top](#how-to-copy-the-candidate-repository)

## Important Git Terminology

- **Repository**: The database where all files and meta information are stored.
- **Working Copy**: A location, private to an individual, containing copies of files in use.
- **Checkout**: The process to retrieve a working copy of files from a repository.
- **Commit**: Store the current changes of the repository in a new commit along with a log message from the user describing the changes.
- **Update**: Bring the contents of a working copy in line with the repository.
- **Branching**: Working in an alternative thread of changes without interfering with the current main branch.

[Back To The Top](#how-to-copy-the-candidate-repository)

## Important Git Commands

- **git clone**: Creating a private working copy of a remote repository.
- **git add**: Add changes to the commit area. All files in this area can now be versioned using the succeeding git commit command.
- **git commit**: Assign a commit message and therefore version all files within the staging area.
- **git status**: Check the current status of the repository. What files are in the commit area or modified.
- **git push**: Push local changes to the central remote repository.
- **git pull**: Pull remote changes to your local working copy.

[Back To The Top](#how-to-copy-the-candidate-repository)

## How to Copy (Fork) the Candidate Repository

1. Open GitHub and log in with your personal GitHub account.
2. Open the candidate [repository](https://github.com/modul-i-ch-109/counter-app) on GitHub.
3. Within the repository, use the "Fork" option to create a copy of the current project within your personal GitHub profile.  
   ![fork_button](./fork.png)
4. Select your personal GitHub profile as the destination.  
   ![fork_destination](./destination.png)
5. GitHub will now copy the repository to your personal GitHub profile. This allows you to make changes independently of the original repository. If you would like to merge your changes back to the original project at any point, you can use the merge request functionality within GitHub.

[Back To The Top](#how-to-copy-the-candidate-repository)
