package com.photo.upload.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PlateMapperTest {

    private PlateMapper plateMapper;

    @BeforeEach
    public void setUp() {
        plateMapper = new PlateMapperImpl();
    }
}
