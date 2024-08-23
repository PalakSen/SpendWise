package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.OrgCategory;

public interface OrgCategoryRepository extends JpaRepository<OrgCategory, Integer> {

}
