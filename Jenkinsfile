pipeline {
    agent any

    stages {
        // CORRECTED: Added "Build" stage and fixed brace placement
        stage('Build') {
            steps {
                sh 'docker build -t my-frontend ./frontend'
            }
        }
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Ayushb1604/Devops-project.git'
            }
        }
        stage('Deploy with Ansible') {
            steps {
                sh 'ansible-playbook ./ansible/deploy.yml'
            }
        }
    }
}
