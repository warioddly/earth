in vec2 a_position;
in vec2 a_tex_coord;
in vec4 a_colour;

uniform mat4 matrix;

out vec4 v_colour;
out vec2 tex_coord;

void main() {
    v_colour = a_colour;
    tex_coord = a_tex_coord;
    gl_Position = matrix * vec4(a_position, 0, 1);
}
