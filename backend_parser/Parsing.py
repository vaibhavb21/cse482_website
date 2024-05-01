import csv
from dataclasses import dataclass
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # <--- Added this line

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

def build_tree(file_path):
    nodes = {}
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        next(reader)
        for row in reader:
            node_id = int(row[0])
            question = row[1]
            values = [value.strip() for value in row[2].split(',')]
            child_ids = [child_id.strip() for child_id in row[3].split(',')]
            type = int(row[4])
            node = Node(node_id, question, values, child_ids, type)
            nodes[int(node_id)] = node
    return nodes


# return the next node
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


@app.route('/process_user_input', methods=['POST'])
def process_user_input():
    return


def traverse_tree(tree, current):
    sendNode(current)
    print(current.question)
    user_choices = []
    user_input = None
    if len(current.values) > 1:
        # multiple branches
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
    # references[hash(current)] = user_input
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


@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'message': 'Hello World'})


# tree = build_tree('/Users/priyanshusugasani/Desktop/cse482/alrite.csv')
# traverse_tree(tree, tree[1])
# print(references)

if __name__ == '__main__':
    app.run()
