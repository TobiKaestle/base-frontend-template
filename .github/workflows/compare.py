import json
import sys
import os


def add_key(data, keys: set, base_key):
    if isinstance(data, dict):
        for key in data:
            add_key(data[key], keys, base_key + "." + key)
    else:
        keys.add(base_key)


def load_keys(lang_json):
    keys = set()
    with open(lang_json, 'r') as de_file:
        data = json.load(de_file)
        for key in data.keys():
            add_key(data[key], keys, key)

    return keys

keys_de = load_keys(os.path.dirname(__file__) + '/../../src/locales/de.json')
keys_en = load_keys(os.path.dirname(__file__) + '/../../src/locales/en.json')

new_keys_in_de = keys_de - keys_en
new_keys_in_en = keys_en - keys_de

if len(new_keys_in_en) == 0 and len(new_keys_in_de) == 0:
    print("Both language files have the same language keys.")
    sys.exit(0)

if len(new_keys_in_de) > 0:
    print("The following language keys are missing in the english language file:")
    for key in sorted(new_keys_in_de):
        print(key)

print()

if len(new_keys_in_en) > 0:
    print("The following language keys are missing in the german language file:")
    for key in sorted(new_keys_in_en):
        print(key)

print()
print("%d total language keys in DE" % len(keys_de))
print("%d total language keys in EN" % len(keys_en))
print()
print("There are %d keys missing in DE" % len(new_keys_in_en))
print("There are %d keys missing in EN" % len(new_keys_in_de))

sys.exit(1)
