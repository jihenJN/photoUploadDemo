package com.photo.upload.service;

import com.photo.upload.domain.Plate;
import com.photo.upload.repository.PlateRepository;
import com.photo.upload.service.dto.PlateDTO;
import com.photo.upload.service.mapper.PlateMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link Plate}.
 */
@Service
public class PlateService {

    private final Logger log = LoggerFactory.getLogger(PlateService.class);

    private final PlateRepository plateRepository;

    private final PlateMapper plateMapper;

    public PlateService(PlateRepository plateRepository, PlateMapper plateMapper) {
        this.plateRepository = plateRepository;
        this.plateMapper = plateMapper;
    }

    /**
     * Save a plate.
     *
     * @param plateDTO the entity to save.
     * @return the persisted entity.
     */
    public PlateDTO save(PlateDTO plateDTO) {
        log.debug("Request to save Plate : {}", plateDTO);
        Plate plate = plateMapper.toEntity(plateDTO);
        plate = plateRepository.save(plate);
        return plateMapper.toDto(plate);
    }

    /**
     * Update a plate.
     *
     * @param plateDTO the entity to save.
     * @return the persisted entity.
     */
    public PlateDTO update(PlateDTO plateDTO) {
        log.debug("Request to update Plate : {}", plateDTO);
        Plate plate = plateMapper.toEntity(plateDTO);
        plate = plateRepository.save(plate);
        return plateMapper.toDto(plate);
    }

    /**
     * Partially update a plate.
     *
     * @param plateDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<PlateDTO> partialUpdate(PlateDTO plateDTO) {
        log.debug("Request to partially update Plate : {}", plateDTO);

        return plateRepository
            .findById(plateDTO.getId())
            .map(existingPlate -> {
                plateMapper.partialUpdate(existingPlate, plateDTO);

                return existingPlate;
            })
            .map(plateRepository::save)
            .map(plateMapper::toDto);
    }

    /**
     * Get all the plates.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<PlateDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Plates");
        return plateRepository.findAll(pageable).map(plateMapper::toDto);
    }

    /**
     * Get one plate by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<PlateDTO> findOne(String id) {
        log.debug("Request to get Plate : {}", id);
        return plateRepository.findById(id).map(plateMapper::toDto);
    }

    /**
     * Delete the plate by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Plate : {}", id);
        plateRepository.deleteById(id);
    }
}
