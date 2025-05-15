pipeline {
    agent any
    stages {
        stage('Build docker image') {
            steps {
                sh 'docker build -t my-frontend ./frontend'
            }
        }
        stage('Deploy with Ansible') {
            steps {
                sh 'ansible-playbook ./ansible/deploy.yml'
            }
        }
    }
}
