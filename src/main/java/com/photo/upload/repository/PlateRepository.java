package com.photo.upload.repository;

import com.photo.upload.domain.Plate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Plate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlateRepository extends MongoRepository<Plate, String> {}
