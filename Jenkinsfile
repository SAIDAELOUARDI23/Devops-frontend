pipeline {
    agent any

    tools {
        jdk 'java17'
        nodejs 'node16'
        sonarqubeScanner 'sonarqube-scanner'
        dependencyCheck 'ODC-Check'
        dockerTool 'docker'
    }

    environment {
        SONAR_ORGANIZATION = 'wm-demo0'
        SONAR_PROJECT_KEY = 'wm-demo0_front-end-devsecop'
    }

    stages {
        stage("SonarQube Analysis") {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh "sonar-scanner -Dsonar.organization=${SONAR_ORGANIZATION} -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=."
                }
            }
        }

        stage("Quality Gate") {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }

        stage('OWASP SCAN') {
            steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'ODC-Check'
                archiveArtifacts 'dependency-check-report.xml'
            }
        }

        stage("Docker Build & Push") {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        sh "docker build -t 2048 ."
                        sh "docker run -d --name node-app-container -p 3000:3000  2048"
                       
                    }
                }
            }
        }

        stage("TRIVY") {
            steps {
                sh "trivy image saida777/2048:latest > trivy.txt"
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Pipeline successfully completed!"
        }
        failure {
            echo "Pipeline failed! Check logs for details."
        }
    }
}
