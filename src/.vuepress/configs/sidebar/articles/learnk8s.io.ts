import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2025: SidebarYeargroupTemplate = { 
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
  ]
}

const Y2024: SidebarYeargroupTemplate = { 
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "kubernetes-services-and-load-balancing", // 2024-10-21
    "kubernetes-rollbacks", // 2024-07-01
    "kubernetes-long-lived-connections", // 2024-06-10
    "allocatable-resources", // 2024-05-27
    "troubleshooting-deployments", // 2024-05-13
    "graceful-shutdown", // 2024-04-22
  ]
}

const Y2023: SidebarYeargroupTemplate = { 
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    "kubernetes-node-size", // 2023-08-15
    "terraform-eks", // 2023-01-11
    "terraform-gke", // 2023-01-11
  ]
}

const Y2022: SidebarYeargroupTemplate = { 
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
    "authentication-kubernetes", // 2022-06-30
    "developing-and-packaging-nodejs-docker", // 2022-06-27
    "deploying-nodejs-kubernetes", // 2022-06-27
    "scaling-nodejs-kubernetes", // 2022-06-27
    "deploying-nodejs-kubernetes-eks", // 2022-06-27
    "kafka-ha-kubernetes", // 2022-04-27
    "rbac-kubernetes", // 2022-03-31
    "spring-boot-kubernetes-guide", // 2022-03-28
    "kubernetes-network-packets", // 2022-01-13
  ]
}

const Y2021: SidebarYeargroupTemplate = { 
  text: '2021',
  collapsible: true,
  children: [
    // END: 2021
    "terraform-lke", // 2021-11-25
    "etcd-kubernetes", // 2021-07-21
    "kubernetes-autoscaling-strategies", // 2021-06-01
    "terraform-aks", // 2021-03-17
    "scaling-celery-rabbitmq-kubernetes", // 2021-03-10
    "sidecar-containers-patterns", // 2021-02-16
  ]
}

const Y2020: SidebarYeargroupTemplate = { 
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
    "installing-docker-kubernetes-windows", // 2020-12-14
    "microservices-authentication-kubernetes", // 2020-12-01
    "setting-cpu-memory-limits-requests", // 2020-09-02
    "kubernetes-policies", // 2020-07-15
    "validating-kubernetes-yaml", // 2020-06-17
    "templating-yaml-with-code", // 2020-05-12
    "kubernetes-deploy-laravel-the-easy-way", // 2020-05-12
    "real-time-dashboard", // 2020-04-28
    "kubernetes-custom-authentication", // 2020-04-15
    "how-many-clusters", // 2020-02-20
  ]
}

const Y2019: SidebarYeargroupTemplate = { 
  text: '2019',
  collapsible: true,
  children: [
    // END: 2019
    "kubernetes-ingress-api-gateway", // 2019-12-11
    "scaling-spring-boot-microservices", // 2019-11-15
    "autoscaling-apps-kubernetes", // 2019-10-03
    "kubernetes-secrets-in-git", // 2019-09-25
    "visualise-dependencies-kubernetes", // 2019-05-08
    "helm-templating-kubernetes-yaml", // 2019-04-16
    "kubectl-productivity", // 2019-04-15
    "kubernetes-chaos-engineering-lessons-learned", // 2019-04-15
    "smaller-docker-images", // 2019-04-14
    "connecting-multiple-kubernetes-clusters", // 2019-04-04
  ]
}

export const template: SidebarInfoTemplate = {
  name: 'learnk8s.io',
  faviconPath: 'https://static.learnk8s.io/f7e5160d4744cf05c46161170b5c11c9.svg',
  linksMap: new Map([
    [
    "java-spring", [
      "scaling-spring-boot-microservices", // 2019-11-15
      "spring-boot-kubernetes-guide", // 2022-03-28
    ]],[
    "java-kafka", [
      "scaling-spring-boot-microservices", // 2019-11-15
      "kafka-ha-kubernetes", // 2022-04-27
    ]],[
    "java-elasticsearch", [
      "sidecar-containers-patterns", // 2021-02-16
    ]],[
    "js-node", [
      "scaling-nodejs-kubernetes", // 2022-06-27
      "deploying-nodejs-kubernetes", // 2022-06-27
      "developing-and-packaging-nodejs-docker", // 2022-06-27
    ]],[
    "py-celery", [
      "scaling-celery-rabbitmq-kubernetes", // 2021-03-10
    ]],[
    "py-locust", [
      "scaling-celery-rabbitmq-kubernetes", // 2021-03-10
    ]],[
    "go", [
      "kubernetes-custom-authentication", // 2020-04-15
      // END: 2020go
      // END: go
    ]],[
    "php", [
      "kubernetes-deploy-laravel-the-easy-way", // 2020-05-12
      // END: 2020php
      // END: php
    ]],[
    "erl-rabbitmq", [
      "scaling-spring-boot-microservices", // 2019-11-15
      "scaling-celery-rabbitmq-kubernetes", // 2021-03-10
    ]],[
    "git", [
      "kubernetes-secrets-in-git", // 2019-09-25
    ]],[
    "win", [
      "installing-docker-kubernetes-windows", // 2020-12-14
    ]],[
    "docker", [
      "smaller-docker-images", // 2019-04-14
      "scaling-spring-boot-microservices", // 2019-11-15
      "kubernetes-deploy-laravel-the-easy-way", // 2020-05-12
      "installing-docker-kubernetes-windows", // 2020-12-14
      "kubernetes-network-packets", // 2022-01-13
      "developing-and-packaging-nodejs-docker", // 2022-06-27
    ]],[
    "k8s", [
      "connecting-multiple-kubernetes-clusters", // 2019-04-04
      "kubernetes-chaos-engineering-lessons-learned", // 2019-04-15
      "kubectl-productivity", // 2019-04-15
      "helm-templating-kubernetes-yaml", // 2019-04-16
      "visualise-dependencies-kubernetes", // 2019-05-08
      "kubernetes-secrets-in-git", // 2019-09-25
      "autoscaling-apps-kubernetes", // 2019-10-03
      "scaling-spring-boot-microservices", // 2019-11-15
      "kubernetes-ingress-api-gateway", // 2019-12-11
      "how-many-clusters", // 2020-02-20
      "cloud-resources-kubernetes", // 2020-04-01
      "kubernetes-custom-authentication", // 2020-04-15
      "real-time-dashboard", // 2020-04-28
      "kubernetes-deploy-laravel-the-easy-way", // 2020-05-12
      "templating-yaml-with-code", // 2020-05-12
      "validating-kubernetes-yaml", // 2020-06-17
      "kubernetes-policies", // 2020-07-15
      "setting-cpu-memory-limits-requests", // 2020-09-02
      "microservices-authentication-kubernetes", // 2020-12-01
      "installing-docker-kubernetes-windows", // 2020-12-14
      "sidecar-containers-patterns", // 2021-02-16
      "scaling-celery-rabbitmq-kubernetes", // 2021-03-10
      "kubernetes-autoscaling-strategies", // 2021-06-01
      "etcd-kubernetes", // 2021-07-21
      "kubernetes-network-packets", // 2022-01-13
      "spring-boot-kubernetes-guide", // 2022-03-28
      "rbac-kubernetes", // 2022-03-31
      "kafka-ha-kubernetes", // 2022-04-27
      "deploying-nodejs-kubernetes-eks", // 2022-06-27
      "scaling-nodejs-kubernetes", // 2022-06-27
      "deploying-nodejs-kubernetes", // 2022-06-27
      "authentication-kubernetes", // 2022-06-30
      "terraform-gke", // 2023-01-11
      "kubernetes-node-size", // 2023-08-15
      "graceful-shutdown", // 2024-04-22
      "troubleshooting-deployments", // 2024-05-13
      "allocatable-resources", // 2024-05-27
      "kubernetes-long-lived-connections", // 2024-06-10
      "kubernetes-rollbacks", // 2024-07-01
      "kubernetes-services-and-load-balancing", // 2024-10-21
    ]],[
    "linode", [
      "terraform-lke", // 2021-11-25
    ]],[
    "aws", [
      "cloud-resources-kubernetes", // 2020-04-01
      "deploying-nodejs-kubernetes-eks", // 2022-06-27
      "terraform-eks", // 2023-01-11
      // END: 2023aws
      "allocatable-resources", // 2024-05-27
      // END: 2024aws
      // END: 2025aws
      // END: aws
    ]],[
    "azure", [
      "cloud-resources-kubernetes", // 2020-04-01
      "terraform-aks", // 2021-03-17
      // END: 2021azure
      // END: 2022azure
      // END: 2023azure
      "allocatable-resources", // 2024-05-27
      // END: 2024azure
      // END: azure
    ]],[
    "gcp", [
      "cloud-resources-kubernetes", // 2020-04-01
      "kubernetes-custom-authentication", // 2020-04-15
      // END: 2020gcp
      // END: 2021gcp
      // END: 2022gcp
      "terraform-gke", // 2023-01-11
      // END: 2023gcp
      "allocatable-resources", // 2024-05-27
      // END: 2024gcp
      // END: gcp
    ]],[
    "mongodb", [
      "developing-and-packaging-nodejs-docker", // 2022-06-27
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
      Y2022,
      Y2021,
      Y2020,
      Y2019,
    ]]
  ])
}