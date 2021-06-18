function withModalStyles(Modal, styles) {
  return ({ render }) => {
    return <Modal styles={styles} render={render} />
  }
}

export default withModalStyles
