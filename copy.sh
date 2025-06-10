#!/bin/bash

# Funktion zum Ersetzen des Textes in einer Datei (case-insensitive)
replace_text_in_file() {
    src_text="$1"
    dest_text="$2"
    file="$3"

    # Ersetzen von ${src_text^} durch ${dest_text^} (großgeschrieben)
    sed -i "s/${src_text^}/${dest_text^}/g" "$file"

    # Ersetzen von ${src_text,,} durch ${dest_text,,} (kleingeschrieben)
    sed -i "s/${src_text,,}/${dest_text,,}/g" "$file"
}

# Funktion zum Umwandeln des ersten Buchstabens in einen Großbuchstaben
capitalize_first_letter() {
    string="$1"

    # Extrahieren des ersten Buchstabens und Umwandeln in Großbuchstaben
    first_letter="${string:0:1}"
    capitalized_first_letter="${first_letter^}"

    # Kombinieren des Großbuchstabens mit dem restlichen Teil des Strings
    capitalized_string="${capitalized_first_letter}${string:1}"

    echo "$capitalized_string"
}

# Funktion zum Kopieren von Dateien in eine neue Ordnerstruktur mit Umbenennung
copy_files_with_renaming() {
    src_path="$1"
    dest_path="$2"
    src_name="$3"
    dest_name="$4"

    # Überprüfen der Existenz des Quellordners
    if [ -d "$src_path" ]; then
        # Rekursives Durchsuchen des Quellverzeichnisses
        find "$src_path" -type f -iname "*$src_name*" -print0 | while IFS= read -r -d '' file; do
            # Erstellen des Zielverzeichnisses
            dest_file="${file//$src_path/$dest_path}"
            dest_file="${dest_file//$src_name/$dest_name}"
            dest_dir=$(dirname "$dest_file")
            mkdir -p "$dest_dir"

            # Kopieren der Datei und Ersetzen des Textes
            cp "$file" "$dest_dir"
            c_src_name=$(capitalize_first_letter "$src_name")
            c_dest_name=$(capitalize_first_letter "$dest_name")
            replace_text_in_file "$src_name" "$dest_name" "$dest_file"
            replace_text_in_file "$c_src_name" "$c_dest_name" "$dest_file"

            # Umbenennen der Datei
            mv "$file" "${dest_file//$c_src_name/$c_dest_name}"

            echo "Kopiert: $file -> ${dest_file//$c_src_name/$c_dest_name}"
        done
    else
        echo "Quellordner existiert nicht: $src_path"
    fi
}

# Eingabe des Quellnamens und Zielnamens für Ordner und Dateien
read -p "Quellname für Ordner und Dateien: " src_name
read -p "Zielname für Ordner und Dateien: " dest_name

# Kopieren und Umbenennen der Dateien in eine neue Ordnerstruktur
copy_files_with_renaming "src/views" "src/views/" "$src_name" "$dest_name"
copy_files_with_renaming "src/components" "src/components/" "$src_name" "$dest_name"

# Umbenennen der Dateien im "src" Verzeichnis
c_src_name=$(capitalize_first_letter "$src_name")
c_dest_name=$(capitalize_first_letter "$dest_name")
cp "src/stores/${c_src_name^}Store.ts" "src/stores/${c_dest_name^}Store.ts"
cp "src/types/${c_src_name^}.ts" "src/types/${c_dest_name^}.ts"

# Ersetzen des Textes in den Dateien im "src" Verzeichnis
replace_text_in_file "${c_src_name^}" "${c_dest_name^}" "src/stores/${c_dest_name^}Store.ts"
replace_text_in_file "${c_src_name^}" "${c_dest_name^}" "src/types/${c_dest_name^}.ts"
