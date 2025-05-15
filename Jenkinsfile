pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Ayushb1604/Devops-project.git/',
                    credentialsId: 'Devops_project'  // <--- This is the correct place!
            }
        }
        stage('Build') {
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
