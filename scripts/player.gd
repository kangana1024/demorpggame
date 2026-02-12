extends CharacterBody3D

## Player movement script for RPG Demo Game
## Controls a CharacterBody3D with WASD/arrow key movement and jumping

# Movement constants
const SPEED: float = 5.0
const JUMP_VELOCITY: float = 4.5

# Get the gravity from the project settings to be synced with RigidBody nodes
var gravity: float = ProjectSettings.get_setting("physics/3d/default_gravity")


func _physics_process(delta: float) -> void:
	# Add gravity when not on the floor
	if not is_on_floor():
		velocity.y -= gravity * delta

	# Handle jump - only when on floor
	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# Get the input direction using custom input actions
	var input_dir: Vector2 = Input.get_vector("move_left", "move_right", "move_forward", "move_backward")

	# Calculate movement direction relative to player's transform
	var direction: Vector3 = (transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()

	# Apply horizontal movement
	if direction:
		velocity.x = direction.x * SPEED
		velocity.z = direction.z * SPEED
	else:
		# Smooth deceleration when no input
		velocity.x = move_toward(velocity.x, 0, SPEED)
		velocity.z = move_toward(velocity.z, 0, SPEED)

	# Apply movement using built-in physics
	move_and_slide()
