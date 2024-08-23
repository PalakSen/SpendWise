package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.PersonalCategory;

public interface PersonalCategoryRepository extends JpaRepository<PersonalCategory, Integer> {

}
