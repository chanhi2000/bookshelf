---
lang: en-US
title: "What are Data Transfer Objects? Learn to Use DTOs in Your Java Spring-Based Projects"
description: "Article(s) > What are Data Transfer Objects? Learn to Use DTOs in Your Java Spring-Based Projects"
icon: iconfont icon-spring
category:
  - Java
  - Spring
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - spring
  - java-spring
  - springframework
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What are Data Transfer Objects? Learn to Use DTOs in Your Java Spring-Based Projects"
    - property: og:description
      content: "What are Data Transfer Objects? Learn to Use DTOs in Your Java Spring-Based Projects"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-are-dtos-java.html
prev: /programming/java-spring/articles/README.md
date: 2025-08-20
isOriginal: false
author:
  - name: Augustine Alul
    url : https://freecodecamp.org/news/author/augustinealul/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755626027353/feb7f6b6-4841-4559-a976-e73c708c7153.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Spring > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-spring/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What are Data Transfer Objects? Learn to Use DTOs in Your Java Spring-Based Projects"
  desc="High performance and privacy are at the heart of most successful software systems. No one wants to use a software service that takes a ridiculous amount of time to load - and no company wants their users’ data exposed at the slightest vulnerability. ..."
  url="https://freecodecamp.org/news/what-are-dtos-java"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755626027353/feb7f6b6-4841-4559-a976-e73c708c7153.png"/>

High performance and privacy are at the heart of most successful software systems. No one wants to use a software service that takes a ridiculous amount of time to load - and no company wants their users’ data exposed at the slightest vulnerability. This is why DTOs are a crucial topic for software engineers to understand.

Using DTOs is helpful when building applications that hold sensitive data like financial or health records. When used properly, DTOs can prevent sensitive fields from being exposed to the client side. In critical systems, they can further tighten security and reduce failure conditions by ensuring that only valid and required fields are accepted.

In this article, you’ll learn what DTOs are, why they’re important, and the best ways to create them for your Spring-based applications.

::: note Prerequisites

This is a slightly more advanced tutorial. So to understand it better, you should have a sound knowledge of Java concepts like objects, getters and setters, and Spring/Spring Boot. You should also have a solid understanding of how software works in general.

:::

---

## What is a DTO?

DTOs stand for Data Transfer Objects. It is a software design pattern that ensures the transfer of tailored/streamlined data objects between different layers of a software system.

![Image showing the lifecycle of DTO in a software system<br/>Image [<VPIcon icon="fa-brands fa-linkedin"/>source](https://linkedin.com/pulse/clean-spring-boot-apis-separating-entities-dtos-mappers-fabio-ribeiro-zrn9f?utm_source=share&utm_medium=member_ios&utm_campaign=share_via) | Fabio Ribeiro](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfY0uhU1igdbtYzBocBZFOY37O2IjXOD5wCJ26DS0B3U6SZnIswn1n8kWi7ZKL5tQfSQjAZR7ecJ-5Aavop5iB3meJA5ywuKlv7fChG2Oq1_fxNtNW_8RijTFQx2d1ZG-A5y5uYag?key=3uLKQHZqj2e_zuUsBBBZwg)

The direction of data transfer with DTOs across the various layers of software is bi-directional. DTOs are either used to carry data in an inbound direction from an external client/user to the software or are constructed and used to carry data in an outbound direction from the software.

DTOs only hold field data, constructors, and necessary getter and setter methods. So they are Plain Old Java Objects (POJOs).

You can see the bi-directional flow in the image below:

![Image showing the bi-directional flow of DTO in a software system, flowing from controller to Database and from Database back to the controller<br/>Image [<VPIcon icon="fa-brands fa-linkedin"/>source](https://linkedin.com/pulse/clean-spring-boot-apis-separating-entities-dtos-mappers-fabio-ribeiro-zrn9f?utm_source=share&utm_medium=member_ios&utm_campaign=share_via) | Fabio Ribeiro](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdHient8hAwmq3b3KhZi2tNuh0n_1ZuIFJxef1VnM_R5K4KoC0gjeZAF1vZ1d1_lliWKmltiNhhtlfCpadydurab8dNkfLQiru1wGcl2Egak-_3-IYI_n5adrbcrU-4ezKIVERU?key=3uLKQHZqj2e_zuUsBBBZwg)

### Why Use DTOs?

#### 1. Data Privacy

In Spring Boot, entities serve as the blueprint for creating data objects. These entities are classes annotated with `@Entity` and map to a database table. An instance of the entity class represents a database row or record, while a field in the entity class represents a database column.

When registering for a software service or product, the user might be asked to provide both sensitive and non-sensitive data for the proper functioning of the application. These data are held as fields by the entity class and finally mapped and persisted to the database.

When we need to retrieve data from the database and expose it through an API endpoint based on the query provided - say, a query to retrieve a user record or entity, Jackson (the serializer dependency commonly used in Spring-based applications) serialises all the data fields contained in the retrieved user entity. Now, imagine you have a User entity that contains fields like password, credit card details, date of birth, home address, and other sensitive data you wouldn’t want to reveal when the User entity is being serialised. Well, this is where DTOs come in.

With DTOs, you can retrieve the complete entity (containing both sensitive and insensitive data) from the database, create a custom class (say <VPIcon icon="fa-brands fa-java"/>`UserDTO.java`) that only holds the insensitive fields that you feel are safe to expose, and finally, map the database-retrieved entity to the safe-to-expose UserDTO object. This way, the UserDTO is what gets serialised and exposed through the API endpoint and not the complete entity - keeping the sensitive data confidential.

#### 2. Improved Software Performance

DTOs can improve the performance of your software application by reducing the number of API calls for data retrieval. With DTOs, you can return serialized data from more than one entity in just one API call.

Let’s say that in your Spring Boot application, there are User and Follower entities, and you want to return user data as well as their followers. Typically, Jackson can only serialize one entity at a time, either User or Follower. But with a DTO, you can combine these two entities into one and eventually serialize and return all the data in a single request, instead of building two endpoints to return user and follower data.

In the next section, I’ll show you the various ways you can create DTOs for your Spring Boot project with code implementations.

---

## How to Create a DTO for a Spring-Based Application

There are two main approaches to creating DTOs in Spring/Spring Boot:

### 1. Creating Custom Objects and Handling Mapping Manually

This approach requires you to handle the mapping/transforming of your existing entity to the custom object (DTO) by yourself - that is to say, you write the code that creates the DTO and sets the DTO fields to the values present in the existing entity. This is common for developers who prefer fine-grained control, but it can be tedious for large-scale projects.

Follow the steps below to create a UserDTO from a User entity:

#### Step 1: Create the DTO class

Create a new file named <VPIcon icon="fa-brands fa-java"/>`UserDTO.java` and write the code below into it:

```java :collapsed-lines title="UserDTO.java"
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;


    // No-args Constructor
    public UserDTO() {}

    // All-args constructor
    public UserDTO(Long id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }


    // Getters and Setters
    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }


    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
```

The defined UserDTO class can only hold four (4) fields: `id`, `firstName`, `lastName`, and `email`. It’s not capable of exposing or receiving more than this number of fields. The class also contains getter and setter methods for retrieving and assigning data to the fields.

#### Step 2: Create Mapper Methods Inside a Utility Class

Create a new file named <VPIcon icon="fa-brands fa-java"/>`UserMapper.java` and put this piece of code into it:

```java title="UserMapper.java"
public class UserMapper {

    // Convert Entity to DTO

    public static UserDTO toDTO(UserEntity user) {

        if (user == null) return null;

        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        return dto;
    }


    // Convert DTO to Entity

    public static UserEntity toEntity(UserDTO dto) {

        if (dto == null) return null;
       UserEntity user = new UserEntity(); 
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());

        return user;
    }

    // ...
}
```

The UserMapper class is a utility class that maps the UserEntity to a DTO and the DTO to an entity. This is where the bi-directional data transfer I talked about earlier comes into play. First, the UserEntity-DTO-direction involves retrieving the complete record from the database and transforming it into a streamlined object (void of unnecessary information) before it’s serialized and exposed to the client side through an API endpoint.

The DTO-UserEntity-direction involves taking the object from the client side as input into the system, but this time, to limit the client in terms of the number of data fields they can pass to the system. This object is received, mapped to an entity, and saved in the system. This is important when you don’t want the client to have access to certain critical fields (that would make your application vulnerable). That’s why software engineers always say, “Don’t trust the user”.

Let me give you a peek into what our UserEntity looks like:

```java :collapsed-lines title="UserEntity.java"
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
public class UserEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String email;
    private String password;
    private String phoneNumber;
    private String gender;
    private LocalDate dateOfBirth;
    private String address;
    private String city;
    private String state;
    private String country;
    private String profilePictureUrl;
    private boolean isVerified;
    private LocalDate createdAt;
    private LocalDate updatedAt;

    // Constructors
    public UserEntity() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
       return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

}
```

In the code snippet above, you can see that the UserDTO holds just four (4) fields, which are insensitive and safe to expose upon serialization. These fields are id, firstName, lastName, and email - unlike the UserEntity, which contains both the sensitive and insensitive fields. So, the not-safe-to-expose UserEntity maps to the safe-to-expose UserDTO. With that being done, the UserDTO object can be serialized and returned through an endpoint. You can now see why DTOs help us prevent exposing confidential information.

### 2. Creating Custom Objects and Handling Mapping Through an External Library

Using an external library means adding a layer of abstraction to the mapping process. The library handles the stressful parts of the job for you, and it’s often a preferred choice for large-scale projects. In this article, we’re using **MapStruct** because it’s popular and easy to use. Maven will be our build tool.

#### Step 1: Add the dependency to your project

Since you are using Maven as your build tool, open your <VPIcon icon="iconfont icon-code"/>`pom.xml` file and add this code:

```xml title="pom.xml"
<dependencies>
    <!-- MapStruct API -->
    <dependency>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct</artifactId>
        <version>1.5.5.Final</version>
    </dependency>
</dependencies>
<build>
    <plugins>
        <!-- Annotation processor plugin -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.10.1</version>
            <configuration>
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.mapstruct</groupId>
                        <artifactId>mapstruct-processor</artifactId>
                        <version>1.5.5.Final</version>
                    </path>
                </annotationProcessorPaths>
            </configuration>
        </plugin>
    </plugins>
</build>
```

This will help download the dependency during the project build.

#### Step 2: Define your DTO

Use the <VPIcon icon="fa-brands fa-java"/>`UserDTO.java` file given in step 1 of the first approach.

#### Step 3: Create the MapStruct Mapper Interface

Create a file and name it <VPIcon icon="fa-brands fa-java"/>`UserMapper.java`, and add the code below to it:

```java title="UserMapper.java"
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    UserDTO toDTO(UserEntity user);
    UserEntity toEntity(UserDTO userDTO);
}
```

The UserMapper interface contains the INSTANCE field and two methods, namely toDTO and toEntity, that take in objects of types UserEntity and UserDTO, respectively, as arguments. The implementations of these methods are abstracted and handled by the library for us.

You can now use the mapper methods (toDTO and toEntity) in your Service or Controller.

---

## How to Create DTOs From Two or Multiple Objects

This is one of the most important ways to use DTOs: creating DTOs from more than one entity and combining them as one, so that they can be returned in one API call or request.

There are many ways you can apply this technique and create complex response DTOs, based on the requirements of your project. The form or structure of your API response object might not be the same as the example given in this tutorial - but the same principle applies, which is simply creating individual DTOs and combining them into one DTO, which eventually serves as the response DTO.

The example below isn’t super complex, but it’s sufficient to help you understand how this works so you can leverage the technique in creating more complex API response objects. This example will combine DTOs of a doctor and their appointments.

### Step 1: Create the DTO Classes

Create a file named `DoctorProfileDTO.java` and add this code to it:

```java :collapsed-lines title="DoctorProfileDTO.java"
public class DoctorProfileDTO {
    private String doctorId;
    private String fullName;
    private String email;
    private String specialization;

   // No-args constructor
   public DoctorProfileDTO(){
    }

    // Getter and Setter for doctorId
    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    // Getter and Setter for fullName
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for specialization
    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
}
```

Create another one called `AppointmentDTO.java` and include this code:

```java :collapsed-lines title="AppointmentDTO.java"
public class AppointmentDTO {
    private String appointmentId;
    private String appointmentDate;
    private String status;
    private String patientName;
    private String patientEmail;

   // No-args constructor
   public AppointmentDTO(){
    }

    // Getter and Setter for appointmentId
    public String getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(String appointmentId) {
        this.appointmentId = appointmentId;
    }

    // Getter and Setter for appointmentDate
    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    // Getter and Setter for status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Getter and Setter for patientName
    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    // Getter and Setter for patientEmail
    public String getPatientEmail() {
        return patientEmail;
    }

    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }
}
```

#### Step 2: Create a Composite DTO Combining both Entities

Create a file named <VPIcon icon="fa-brands fa-java"/>`DoctorWithAppointmentsDTO.java`:

```java title="DoctorWithAppointmentsDTO.java"
import java.util.List;

public class DoctorWithAppointmentsDTO {
    private DoctorProfileDTO doctorProfile;
    private List<AppointmentDTO> appointments;

    // No-args constructor
    public DoctorWithAppointmentsDTO() {
    }

    // Getter and Setter for doctorProfile
    public DoctorProfileDTO getDoctorProfile() {
        return doctorProfile;
    }

    public void setDoctorProfile(DoctorProfileDTO doctorProfile) {
        this.doctorProfile = doctorProfile;
    }

    // Getter and Setter for appointments
    public List<AppointmentDTO> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<AppointmentDTO> appointments) {
        this.appointments = appointments;
    }
}
```

#### Step 3: Create a Mapper Class

Create a mapper class `DoctorMapper.java` containing the logic to map to the **DoctorWithAppointmentsDTO** class:

```java title="DoctorMapper.java"
public class MapperClass {

    public DoctorWithAppointmentsDTO toDTO(Doctor doctor, List<Appointment> appointments) {

        DoctorProfileDTO doctorProfile = new DoctorProfileDTO();
        doctorProfile.setDoctorId(doctor.getId());
        doctorProfile.setFullName(doctor.getFullName());
        doctorProfile.setEmail(doctor.getEmail());
        doctorProfile.setSpecialization(doctor.getSpecialization());

        List<AppointmentDTO> appointmentDTOs = appointments.stream().map(appt -> {
            AppointmentDTO dto = new AppointmentDTO();
            dto.setAppointmentId(appt.getId());
            dto.setAppointmentDate(appt.getDate().toString()); 
            dto.setStatus(appt.getStatus().name());
            dto.setPatientName(appt.getPatient().getName());
            dto.setPatientEmail(appt.getPatient().getEmail());
            return dto;
        }).toList();

        DoctorWithAppointmentsDTO doctorWithAppointment = new DoctorWithAppointmentsDTO();
        doctorWithAppointment.setDoctorProfile(doctorProfile);
        doctorWithAppointment.setAppointments(appointmentDTOs);

        return doctorWithAppointment;
    }
}
```

From the example above, you can see that two separate DTOs (AppointmentDTO and DoctorProfileDTO) were created before the composite DTO, DoctorWithAppointmentsDTO was created. The composite DTO class (DoctorWithAppointmentsDTO) contains fields that hold the instances of the Appointment and DoctorProfile DTOs. The mapper class takes in the Doctor and a list of Appointment entities as arguments, maps them to DoctorProfileDTO and AppointmentDTO, respectively. Finally, the fields for the composite DTO class are set using the DTO objects mapped from the entities.

The **DoctorWithAppointmentsDTO**, when serialised and returned through an endpoint, should give you an output like this:

```json
{
  "doctorProfile": {
    "doctorId": "abc123",
    "fullName": "Dr. Susan Emeka",
    "email": "suzan.emeka@example.com",
    "specialisation": "Cardiology"
  },
  "appointments": [
    {
      "appointmentId": "appt001",
      "appointmentDate": "2025-07-10T09:00:00",
      "status": "CONFIRMED",
      "patientName": "James Agaji",
      "patientEmail": "james.agaji@example.com"
    },
 {
      "appointmentId": "appt002",
      "appointmentDate": "2025-08-12T07:05:08",
      "status": "CONFIRMED",
      "patientName": "Jane Augustine",
      "patientEmail": "jane.augustine@example.com"
    }
  ]
}
```

---

## Conclusion

If you’re a software engineer who’s concerned with privacy and efficiency, using DTOs in your applications is a must.

In this article, you’ve learned what DTOs are as well as the main approaches for creating and using them. Take the time to go through the code snippets given in this article and practice with them until you’re comfortable implementing them yourself. Thanks for reading.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What are Data Transfer Objects? Learn to Use DTOs in Your Java Spring-Based Projects",
  "desc": "High performance and privacy are at the heart of most successful software systems. No one wants to use a software service that takes a ridiculous amount of time to load - and no company wants their users’ data exposed at the slightest vulnerability. ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-are-dtos-java.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
