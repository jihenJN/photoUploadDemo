package com.photo.upload.service.mapper;

import com.photo.upload.domain.Plate;
import com.photo.upload.service.dto.PlateDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Plate} and its DTO {@link PlateDTO}.
 */
@Mapper(componentModel = "spring")
public interface PlateMapper extends EntityMapper<PlateDTO, Plate> {}
