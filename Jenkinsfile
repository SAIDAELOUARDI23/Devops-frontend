pipeline{
    agent any
    tools{
        jdk 'java17'
        nodejs 'node16'
    }
    environment {
        SCANNER_HOME=tool 'sonarqube-scanner'
    }
    stages {
        stage("Sonarqube Analysis "){
            steps{
                withSonarQubeEnv('sonar-server') {
                    sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.organization=wm-demo0 -Dsonar.projectKey=wm-demo0_front-end-devsecop -Dsonar.sources=. -Dsonar.host.url=https://sonarcloud.io'''
                }
            }
        }
        stage("Quality gate"){
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
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        stage("Docker Build & Push"){
            steps{
                script{
                   withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){   
                       sh "docker build -t 2048 ."
                       sh "docker run -d --name node-app-container -p 3000  2048 saida777/2048:latest "
                       
                    }
                }
            }
        }
        
        stage("TRIVY"){
            steps{
                sh "trivy image saida777/2048:latest > trivy.txt" 
            }
        }
       
       
    post {
        always {
            cleanWs()
        }
    }
}
   
