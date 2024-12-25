from flask import Flask, jsonify, request
#from flask_cors import CORS
import requests

app = Flask(__name__)
#CORS(app)



tasks = []  # In-memory list to store tasks
@app.route('/api/tasks', methods=['GET', 'POST', 'DELETE'])
def manage_tasks():
    global tasks

    if request.method == 'GET':
        # Return all tasks
        return jsonify(tasks)

    if request.method == 'POST':
        # Add a new task
        task_data = request.json  # JSON payload from frontend
        if 'task' not in task_data:
            return jsonify({"error": "Task description is required"}), 400
        tasks.append({"id": len(tasks) + 1, "task": task_data['task']})
        return jsonify({"message": "Task added successfully!"}), 201

    if request.method == 'DELETE':
        # Delete a task
        task_id = request.args.get('id')
        if not task_id or not task_id.isdigit():
            return jsonify({"error": "Valid task ID is required"}), 400
        task_id = int(task_id)
        tasks = [task for task in tasks if task['id'] != task_id]
        return jsonify({"message": "Task deleted successfully!"})
if __name__ == "__main__":
    app.run(debug=True)