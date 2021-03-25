General Instructions for setting up Github on your computer:
1. Download gitbash

Initializing gitbash:
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
(Replace John Doe with your own username and password that matches on here)

Cloning Repo:

$ git clone https://github.com/0-7BrainCells/eRes
(This will clone the repo to your current directory, if you already have the repo and just need to update it, just do git pull when in the repo directory)

Initializing Repo to work on code easier:

$ cd (path to repo) 
$ git init
$ git status (will show you the files in the repo and what files are ready to be committed etc.)


To add a new file to commit: (if the file already exists on your computer in the directory)
$ git add filename

(if you want to make a new file then add it to commit instead do $ echo text > filename.txt)

Commit changes/new files once added:

$ git commit -am "Message describing the changes on the commit"
$ git push (this will push the committed changes from your computer onto the online version)



