in vec4 v_colour;
in vec2 tex_coord;
out vec4 pixel;

uniform sampler2D t0;
uniform float glow_size = .5;
uniform vec3 glow_colour = vec3(0, 0, 0);
uniform float glow_intensity = 1;
uniform float glow_threshold = .5;

void main() {
    pixel = texture(t0, tex_coord);
    if (pixel.a <= glow_threshold) {
        ivec2 size = textureSize(t0, 0);

        float uv_x = tex_coord.x * size.x;
        float uv_y = tex_coord.y * size.y;

        float sum = 0.0;
        for (int n = 0; n < 9; ++n) {
            uv_y = (tex_coord.y * size.y) + (glow_size * float(n - 4.5));
            float h_sum = 0.0;
            h_sum += texelFetch(t0, ivec2(uv_x - (4.0 * glow_size), uv_y), 0).a;
            h_sum += texelFetch(t0, ivec2(uv_x - (3.0 * glow_size), uv_y), 0).a;
            h_sum += texelFetch(t0, ivec2(uv_x - (2.0 * glow_size), uv_y), 0).a;
            h_sum += texelFetch(t0, ivec2(uv_x - glow_size, uv_y), 0).a;
            h_sum += texelFetch(t0, ivec2(uv_x, uv_y), 0).a;
            h_sum += texelFetch(t0, ivec2(uv_x + glow_size, uv_y), 0).a;
            h_sum += texelFetch(t0, ivec2(uv_x + (2.0 * glow_size), uv_y), 0).a;
            h_sum += texelFetch(t0, ivec2(uv_x + (3.0 * glow_size), uv_y), 0).a;
            h_sum += texelFetch(t0, ivec2(uv_x + (4.0 * glow_size), uv_y), 0).a;
            sum += h_sum / 9.0;
        }

        pixel = vec4(glow_colour, (sum / 9.0) * glow_intensity);
    }
}
