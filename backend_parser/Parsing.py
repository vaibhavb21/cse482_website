import csv
from dataclasses import dataclass
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Necessary to avoid issues with CORS on browsers

references = {}

@dataclass
class Node:
    id: int
    question: str
    values: list
    children: list
    type: int

    def __hash__(self):
        return self.id * 32 - 180

    def __eq__(self, other):
        return hash(self.id) == hash(other.id)


def tree_to_json(tree, node_id, visited=None):
    # Fetch the node from the tree
    node = tree.get(node_id)

    # Base case: if the node does not exist or has already been visited (to prevent cycles)
    if node is None:
        return None

    # Prepare the node data for JSON conversion
    node_data = {
        'id': node.id,
        'question': node.question,
        'values': node.values,
        'type': node.type,
        'children': []
    }

    # Recursively handle all children that are not marked by 'x'
    for child_id in node.children:
        if child_id.strip().lower() != 'x':
            try:
                # Convert child_id to integer and process if valid
                child_node = tree_to_json(tree, int(child_id), visited)
                if child_node:
                    node_data['children'].append(child_node)
            except ValueError:
                # Handle the case where child_id is not a valid integer
                print(f"Warning: Skipping invalid child ID '{child_id}'")

    return node_data


@app.route('/upload_file', methods=['POST'])
def upload_file():
    file = request.files['file']
    file_contents = file.stream.read().decode('utf-8')
    csv_data = csv.reader(file_contents.splitlines())
    print(csv_data)
    tree = build_tree(csv_data)
    root_node_id = 1
    tree_json = tree_to_json(tree, root_node_id)
    return jsonify(tree_json)


@app.route('/get_tree', methods=['GET'])
def get_tree():
    tree = build_tree('alrite.csv')
    root_node_id = 1
    tree_json = tree_to_json(tree, root_node_id)
    print(json.dumps(tree_json, indent=4))
    return jsonify(tree_json)


def build_tree(tree):
    nodes = {}
    next(tree)
    for row in tree:
        print(row)
        node_id = int(row[0])
        question = row[1]
        values = [value.strip() for value in row[2].split(',')]
        child_ids = [child_id.strip() for child_id in row[3].split(',')]
        type = int(row[4])
        node = Node(node_id, question, values, child_ids, type)
        nodes[int(node_id)] = node
    return nodes


# Return the next node
@app.route('/sendNextNode', methods=['GET'])
def sendNode(current_node):
    if current_node:
        node_data = {
            'id': current_node.id,
            'question': current_node.question,
            'values': current_node.values,
            'children': current_node.children,
            'type': current_node.type
        }
        return jsonify(node_data)
    else:
        return jsonify({'error': 'Invalid node. Please check the data.'})


@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'message': 'Hello World'})


@app.route('/process_user_input', methods=['POST'])
def process_user_input():
    return


def traverse_tree(tree, current):
    sendNode(current)
    print(current.question)
    user_choices = []
    user_input = None
    if len(current.values) > 1:
        # Multiple branches
        user_question = ", ".join(current.values[:-1]) + f" or {current.values[-1]}?"
        user_input = input(user_question).strip().lower()

        for value in current.values:
            if value.lower() in user_input.lower().split(","):
                user_choices.append(value)

        if not user_choices:
            print("Invalid choice. Please try again.")
            return
    else:
        user_input = input("Answer: ").strip()
        user_choices = [user_input]
    references[current.id] = user_input

    if current.children[0] == "x":
        print("Diagnosis complete.")
        return jsonify({'message': 'Diagnosis complete.'})

    if len(current.values) > 1:
        next_node_id = current.children[current.values.index(user_choices[0])]
        next_node = tree.get(int(next_node_id))
    else:
        next_node = tree.get(int(current.children[0]))

    if next_node:
        traverse_tree(tree, next_node)
    else:
        print("Invalid node. Please check the data.")


if __name__ == '__main__':
    app.run(port=5001)