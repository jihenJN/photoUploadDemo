package com.photo.upload.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.photo.upload.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PlateDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlateDTO.class);
        PlateDTO plateDTO1 = new PlateDTO();
        plateDTO1.setId("id1");
        PlateDTO plateDTO2 = new PlateDTO();
        assertThat(plateDTO1).isNotEqualTo(plateDTO2);
        plateDTO2.setId(plateDTO1.getId());
        assertThat(plateDTO1).isEqualTo(plateDTO2);
        plateDTO2.setId("id2");
        assertThat(plateDTO1).isNotEqualTo(plateDTO2);
        plateDTO1.setId(null);
        assertThat(plateDTO1).isNotEqualTo(plateDTO2);
    }
}
