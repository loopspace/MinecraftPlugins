# Minecraft Scripts

This repository is for scripts and plugins using the [ScriptCraft]() mod for
Minecraft.  This mod enables scripting using javascript.

# Bookmarks

The `bookmark.js` script adds a facility to "bookmark" locations for later use
(essentially, for later use in teleportation).

## Commands

~~~
/jsp bookmark save {bookmark}
/jsp bookmark {bookmark}
~~~
These save the current location as a bookmark.  A bookmark name cannot have
spaces.  If the word following `bookmark` is not a known command, it is
assumed to be the name of a bookmark.  Existing bookmarks are not overwritten.

~~~
/jsp bookmark update {bookmark}
~~~
Updates an existing bookmark to the current location. 

~~~
/jsp bookmark forcesave {bookmark}
~~~
Saves the current location as a bookmark, irrespective of whether or not it
already exists.

~~~
/jsp bookmark delete {bookmark}
~~~
Deletes a bookmark.

~~~
/jsp bookmark to {bookmark}
~~~
Teleports the user to the saved location.

~~~
/jsp bookmark todeath
~~~
This plugin automatically saves the location where a user last died.  This teleports the user to that place.

## Notes

This was my first attempt at writing a plugin using Scriptcraft.  It took a
little while to get the syntax right, so it isn't all that elegent!

An obvious improvement would be to make the bookmarks attached to the user
that created them, so only that user can edit or delete them, and that a user
can have private bookmarks as well as public ones.
